# Display Order - Complete Guide

## What is Display Order?

**Display Order** is a number that controls the order in which projects appear in your portfolio.

## How It Works

- **Lower numbers = appear first** (0, 1, 2...)
- **Higher numbers = appear later** (10, 20, 30...)
- Projects are automatically sorted by this number

## Examples

### Example 1: Simple Ordering
```
Project A: Order = 0   → Shows first
Project B: Order = 1   → Shows second  
Project C: Order = 2   → Shows third
```

### Example 2: With Gaps (Recommended)
```
Project A: Order = 0    → Shows first
Project B: Order = 10   → Shows second
Project C: Order = 20   → Shows third
Project D: Order = 30   → Shows fourth
```

**Why use gaps?** If you want to insert a project between A and B later, you can use Order = 5 without changing other projects!

### Example 3: Out of Order
```
Project A: Order = 30   → Shows third
Project B: Order = 10   → Shows first
Project C: Order = 20   → Shows second
```

**Result:** B, then C, then A (sorted automatically)

## Where It's Used

1. **Portfolio Page** (`/portfolio`) - All projects sorted by order
2. **Featured Projects** - Featured projects sorted by order
3. **Admin Dashboard** - Projects list sorted by order

## Best Practices

### ✅ Good Approach:
- Start with 0, 10, 20, 30... (gaps for flexibility)
- Or use 0, 1, 2, 3... (simple sequence)
- Keep it simple!

### ❌ Avoid:
- Using the same number for multiple projects (undefined order)
- Using very large numbers unnecessarily

## How to Set Display Order

When adding/editing a project in the admin panel:

1. Find the **"Display Order"** field
2. Enter a number (e.g., 0, 10, 20)
3. Save the project
4. Projects will automatically reorder!

## Reordering Existing Projects

To change the order of existing projects:

1. Edit each project
2. Change the Display Order number
3. Lower number = appears earlier
4. Save the changes

**Example:** To move a project to the front:
- Change its Order from 30 to 0
- Save it
- It will now appear first!

## Default Value

- New projects default to **Order = 0**
- You can change this to any number you want

## Quick Tips

- **Want a project first?** Set Order = 0
- **Want a project last?** Set a high number like 999
- **Want flexibility?** Use increments of 10 (0, 10, 20...)
- **Same number?** Projects with same order will sort by ID (order created)

---

**That's it!** Display Order is simply a number that controls the sequence of projects in your portfolio.




