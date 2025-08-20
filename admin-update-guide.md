# Financial Transparency - Admin Update Guide

## Quick Updates

### 1. Update Total Raised Amount
Edit `financial-transparency.js`, line 6:
```javascript
raised: 1580,  // Change this number
```

### 2. Update Number of Contributors  
Edit `financial-transparency.js`, line 7:
```javascript
contributors: 23,  // Change this number
```

### 3. Update Expense Category Progress
Edit the `expenses` array in `financial-transparency.js`:
```javascript
{
    category: "Venue & Infrastructure",
    total: 5000,
    raised: 1600,  // Update this amount
    // ...
}
```

### 4. Mark Milestone as Achieved
In the `milestones` array, change:
```javascript
{
    title: "Venue Secured", 
    amount: 3500,
    achieved: true,  // Change to true
    achievedDate: "September 2025",  // Add date
    // ...
}
```

### 5. Add New Recent Contributor
Edit `financial-transparency.html` around line 280, add:
```html
<div class="contribution-item">
    <div class="contribution-item__amount">$100</div>
    <div class="contribution-item__details">
        <div class="contribution-item__name">Name Here</div>
        <div class="contribution-item__message">"Their message here"</div>
    </div>
</div>
```

## Complete Data Structure

### Financial Data Object (financial-transparency.js)
```javascript
const financialData = {
    goal: 15000,           // Total fundraising goal
    raised: 1580,          // Current amount raised
    contributors: 23,      // Number of contributors
    lastUpdated: "2025-08-20",  // Date of last update
    
    milestones: [
        // Array of funding milestones
    ],
    
    expenses: [
        // Array of expense categories
    ]
};
```

### Milestone Structure
```javascript
{
    title: "Milestone Name",
    amount: 3500,               // Target amount
    achieved: false,            // true when reached
    achievedDate: "Month Year", // When achieved
    current: 2920,              // Current progress toward this milestone
    description: "What this funds"
}
```

### Expense Structure  
```javascript
{
    category: "Category Name",
    total: 5000,        // Total needed for this category
    raised: 1600,       // Amount raised for this category
    breakdown: [
        { item: "Specific item", amount: 3000 },
        // More breakdown items...
    ]
}
```

## Testing Updates

1. Edit the JavaScript file
2. Save the file  
3. Refresh the page in your browser
4. Check that all numbers updated correctly
5. Test on mobile device

## Payment Links

Update these in `financial-transparency.html` if accounts change:
- Line 95: Venmo link
- Line 103: PayPal link  
- Line 111: Cash App link

## Celebration Features

When you achieve a milestone, the page will automatically:
- Show a celebration popup
- Update progress bars
- Change milestone status from "current" to "achieved"

To trigger celebration manually:
```javascript
// In browser console:
celebrateMilestone("Venue Secured");
```

## Quick Reference

**Common amounts to update:**
- `raised` - Total money received
- `contributors` - Number of people who donated  
- `expenses[].raised` - Money allocated to each expense category
- `milestones[].current` - Progress toward each milestone

**File locations:**
- Main data: `financial-transparency.js` 
- Page content: `financial-transparency.html`
- Styling: `financial-transparency.css`

**Update frequency:** 
Update at least weekly, or whenever you receive significant donations.

## Example Update Workflow

1. **Receive $250 donation from new contributor:**
   - Increase `raised` by 250
   - Increase `contributors` by 1
   - Add to appropriate `expenses[].raised` 
   - Add contributor to HTML if they want recognition

2. **Reach $3,500 milestone:**
   - Set milestone `achieved: true`
   - Add `achievedDate: "September 2025"`
   - Page will automatically show celebration

3. **Monthly review:**
   - Update `lastUpdated` date
   - Review all numbers for accuracy
   - Add any missing contributors to recognition section