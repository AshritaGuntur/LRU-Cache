# LRU Cache Visualizer 🚀
An interactive web-based visualization of the **Least Recently Used (LRU) Cache** algorithm. This project demonstrates how data structures like **HashMaps** and **Doubly Linked Lists** work together to achieve O(1) access and eviction.
## 🌟 Features
- **Interactive Visualization**: Watch nodes move to the head on access and get evicted from the tail when capacity is full.
- **Real-time Logic**: See the `put()` and `get()` operations in action.
- **Premium UI**: Designed with a modern dark theme, glassmorphism effects, and smooth animations.
- **Educational Landing Page**: Includes a breakdown of how the LRU strategy works.
## 🛠️ Tech Stack
- **HTML5**: Semantic structure.
- **CSS3**: Animations, Flexbox, and modern styling variables.
- **JavaScript (ES6+)**: Core logic implementation of the LRU algorithm using Doubly Linked Lists.
## 🚀 Getting Started
1.  **Clone the repository** (or download usage files).
2.  Open **[index.html])** in your web browser.
3.  Read the "How it Works" section.
4.  Click **"Launch Visualizer"** to enter the application.
## 📚 How it Works
The LRU Cache consists of two main parts:
1.  **Doubly Linked List**: Maintains the order of elements.
    - **Head**: Most Recently Used (MRU).
    - **Tail**: Least Recently Used (LRU).
2.  **Hash Map**: Provides O(1) direct access to any node in the list.
When you access an item, it moves to the **Head**. When the cache is full, the item at the **Tail** is removed.
## 📸 Usage
- **Set Capacity**: Define the size of your cache.
- **Put(Key, Value)**: Insert a new item. If it exists, it updates; if full, it evicts.
- **Get(Key)**: Retrieve an item and refresh its position to MRU.
