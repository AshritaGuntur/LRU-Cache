class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    insert(node) {
        const after = this.head.next;
        node.next = after;
        node.prev = this.head;
        after.prev = node;
        this.head.next = node;
    }

    delete(node) {
        const bef = node.prev;
        const aft = node.next;
        bef.next = aft;
        aft.prev = bef;
        // node.next = null;
        // node.prev = null;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this.delete(node);
        this.insert(node);
        return node.val;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val = value;
            this.delete(node);
            this.insert(node);
        } else {
            if (this.capacity === this.map.size) {
                const last = this.tail.prev;
                this.map.delete(last.key);
                this.delete(last);
            }
            const newNode = new Node(key, value);
            this.insert(newNode);
            this.map.set(key, newNode);
        }
    }
}
