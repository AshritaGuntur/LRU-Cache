document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const capacityInput = document.getElementById('capacity-input');
    const setCapacityBtn = document.getElementById('set-capacity-btn');
    const putKeyInput = document.getElementById('put-key');
    const putValInput = document.getElementById('put-value');
    const putBtn = document.getElementById('put-btn');
    const getKeyInput = document.getElementById('get-key');
    const getBtn = document.getElementById('get-btn');
    const cacheContainer = document.getElementById('cache-container');
    const messageLog = document.getElementById('message-log');

    // State
    let lruCache = new LRUCache(3);

    // Initialize
    updateVisualization();

    // Event Listeners
    setCapacityBtn.addEventListener('click', () => {
        const capacity = parseInt(capacityInput.value);
        if (capacity > 0 && capacity <= 10) {
            lruCache = new LRUCache(capacity);
            logMessage(`Capacity set to ${capacity}. Cache reset.`);
            updateVisualization();
        } else {
            logMessage("Invalid capacity (1-10 allowed).");
        }
    });

    putBtn.addEventListener('click', () => {
        const key = parseInt(putKeyInput.value);
        const val = parseInt(putValInput.value);

        if (isNaN(key) || isNaN(val)) {
            logMessage("Please enter valid Key and Value.");
            return;
        }

        const isUpdate = lruCache.map.has(key);
        lruCache.put(key, val);

        if (isUpdate) {
            logMessage(`Updated key ${key} with value ${val}. Moved to head.`);
        } else {
            console.log(lruCache.map.size, lruCache.capacity);
            // Verify if eviction happened logic roughly (size check done inside class, but we can infer)
            // We'll rely on simply rendering the current state.
            logMessage(`Inserted key ${key}, value ${val}.`);
        }

        updateVisualization(key);

        putKeyInput.value = '';
        putValInput.value = '';
        putKeyInput.focus();
    });

    getBtn.addEventListener('click', () => {
        const key = parseInt(getKeyInput.value);

        if (isNaN(key)) {
            logMessage("Please enter a valid Key.");
            return;
        }

        const val = lruCache.get(key);

        if (val !== -1) {
            logMessage(`Found key ${key} with value ${val}. Moved to head.`);
            updateVisualization(key); // Highlight the accessed node
        } else {
            logMessage(`Key ${key} not found.`);
        }

        getKeyInput.value = '';
        getKeyInput.focus();
    });

    function logMessage(msg) {
        messageLog.textContent = msg;
        messageLog.style.animation = 'none';
        messageLog.offsetHeight; /* trigger reflow */
        messageLog.style.animation = 'fadeIn 0.3s forwards';
    }

    function updateVisualization(activeKey = null) {
        cacheContainer.innerHTML = '';

        let current = lruCache.head.next;
        const nodes = [];

        // Traverse the doubly linked list from head to tail
        while (current && current.next) { // Stop before legitimate tail node which is (-1,-1)
            nodes.push(current);
            current = current.next;
        }

        if (nodes.length === 0) {
            cacheContainer.innerHTML = '<div style="color: var(--text-secondary); width: 100%; text-align: center; padding: 2rem;">Cache is empty</div>';
            return;
        }

        nodes.forEach((node, index) => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'cache-node';

            // Highlight active node
            if (activeKey !== null && node.key === activeKey) {
                nodeEl.classList.add('active');
            }

            // Head and Tail markers
            if (index === 0) nodeEl.classList.add('is-head');
            if (index === nodes.length - 1) nodeEl.classList.add('is-tail');

            nodeEl.innerHTML = `
                <div class="node-label head-label">MRU</div>
                <div class="node-label tail-label">LRU</div>
                <div class="node-header">Key: ${node.key}</div>
                <div class="node-content">${node.val}</div>
            `;

            cacheContainer.appendChild(nodeEl);
        });
    }
});
