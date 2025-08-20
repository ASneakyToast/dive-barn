// Financial Transparency Page JavaScript
// Simple manual update system for tracking donations and progress

// Financial data - update these values manually as donations come in
const financialData = {
    goal: 7690,
    raised: 1580,
    contributors: 23,
    lastUpdated: "2025-08-20",
    
    // Milestones with current progress
    milestones: [
        {
            title: "Community Foundation",
            amount: 1000,
            achieved: true,
            achievedDate: "August 2025",
            description: "Initial planning, permits, and website development"
        },
        {
            title: "Venue Secured", 
            amount: 3500,
            achieved: false,
            current: 2920, // How much we have toward this milestone
            description: "Ranch rental deposit and basic infrastructure"
        },
        {
            title: "Artists Confirmed",
            amount: 7500,
            achieved: false,
            current: 0,
            description: "Performance fees and travel expenses for our lineup"
        },
        {
            title: "Production Ready",
            amount: 12000,
            achieved: false,
            current: 0,
            description: "Sound system, lighting, stage, and safety equipment"
        },
        {
            title: "Festival Complete",
            amount: 7690,
            achieved: false,
            current: 0,
            description: "Full production, art installations, and magical experience"
        }
    ],
    
    // Expense categories with breakdown
    expenses: [
        {
            category: "Venue & Infrastructure",
            total: 5690,
            breakdown: [
                { item: "Ranch rental", amount: 3000 },
                { item: "Pee pee poo poo place", amount: 1200 },
                { item: "Jumbo's Win Win (food vendor)", amount: 750 },
                { item: "Shuttle bus", amount: 500 },
                { item: "New safe stairs", amount: 240 }
            ]
        },
        {
            category: "Artists & Entertainment", 
            total: 1000,
            breakdown: [
                { item: "Artist stipends", amount: 250 },
                { item: "Band fees", amount: 200 }
            ]
        },
        {
            category: "Design & Operations",
            total: 1000,
            breakdown: [
                { item: "Design team", amount: 600 },
                { item: "Preparator", amount: 400 }
            ]
        }
    ]
};

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateFinancialDisplay();
    addInteractiveFeatures();
    updateLastModified();
});

// Update all financial displays on the page
function updateFinancialDisplay() {
    updateHeroStats();
    updateMilestoneProgress();
    updateExpenseCards();
}

// Update the hero section statistics
function updateHeroStats() {
    const totalRaisedEl = document.getElementById('total-raised');
    const goalAmountEl = document.getElementById('goal-amount');
    const contributorsCountEl = document.getElementById('contributors-count');
    const progressFillEl = document.getElementById('progress-fill');
    const progressPercentageEl = document.getElementById('progress-percentage');
    
    if (totalRaisedEl) totalRaisedEl.textContent = `$${financialData.raised.toLocaleString()}`;
    if (goalAmountEl) goalAmountEl.textContent = `$${financialData.goal.toLocaleString()}`;
    if (contributorsCountEl) contributorsCountEl.textContent = financialData.contributors;
    
    // Calculate and update progress bar
    const percentage = (financialData.raised / financialData.goal) * 100;
    if (progressFillEl) {
        progressFillEl.style.width = `${Math.min(percentage, 100)}%`;
    }
    if (progressPercentageEl) {
        progressPercentageEl.textContent = `${percentage.toFixed(1)}%`;
    }
}

// Update milestone progress indicators
function updateMilestoneProgress() {
    const currentMilestone = document.querySelector('.milestone--current');
    if (!currentMilestone) return;
    
    // Find the current active milestone
    const activeMilestone = financialData.milestones.find(m => !m.achieved && m.current > 0);
    if (!activeMilestone) return;
    
    const progressBar = currentMilestone.querySelector('.milestone__progress-fill');
    const progressText = currentMilestone.querySelector('.milestone__progress-text');
    
    if (progressBar && progressText) {
        const percentage = (activeMilestone.current / activeMilestone.amount) * 100;
        const remaining = activeMilestone.amount - activeMilestone.current;
        
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
        progressText.textContent = `$${remaining.toLocaleString()} remaining`;
    }
}

// Update expense category cards
function updateExpenseCards() {
    // Expense cards now show static totals only
    // No progress bars to update since we don't track per-category funding
}

// Add interactive features
function addInteractiveFeatures() {
    // Smooth scroll for donation buttons
    const donationBtns = document.querySelectorAll('.donation-btn');
    donationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add a small delay to show the click effect
            setTimeout(() => {
                // The actual navigation happens automatically via href
            }, 150);
        });
    });
    
    // Add hover effects to milestone markers
    const milestoneMarkers = document.querySelectorAll('.milestone__marker');
    milestoneMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            if (this.parentElement.classList.contains('milestone--achieved')) {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click tracking for donation buttons (for analytics)
    donationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('donation-btn--venmo') ? 'venmo' : 
                           this.classList.contains('donation-btn--paypal') ? 'paypal' : 'cashapp';
            
            // Log donation button click (you can replace this with actual analytics)
            console.log(`Donation button clicked: ${platform}`);
            
            // Optional: You could add a toast notification here
            showDonationClickFeedback(platform);
        });
    });
}

// Show feedback when donation button is clicked
function showDonationClickFeedback(platform) {
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'donation-toast';
    toast.textContent = `Opening ${platform}... Thank you for your support! 💝`;
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--color-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Update the last modified date
function updateLastModified() {
    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl) {
        const date = new Date(financialData.lastUpdated);
        lastUpdatedEl.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Function to manually update financial data (for admin use)
function updateFinancialData(newData) {
    // Merge new data with existing data
    Object.assign(financialData, newData);
    
    // Update displays
    updateFinancialDisplay();
    
    // Update last modified date
    financialData.lastUpdated = new Date().toISOString().split('T')[0];
    updateLastModified();
    
    console.log('Financial data updated:', financialData);
}

// Celebration animation for when milestones are achieved
function celebrateMilestone(milestoneTitle) {
    // Create celebration overlay
    const celebration = document.createElement('div');
    celebration.className = 'milestone-celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-emoji">🎉</div>
            <h3>Milestone Achieved!</h3>
            <p>${milestoneTitle}</p>
            <div class="celebration-confetti"></div>
        </div>
    `;
    
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const celebrationContent = celebration.querySelector('.celebration-content');
    celebrationContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 1rem;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const emoji = celebration.querySelector('.celebration-emoji');
    emoji.style.cssText = `
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: bounce 0.6s ease infinite alternate;
    `;
    
    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(celebration);
    
    // Animate in
    setTimeout(() => {
        celebration.style.opacity = '1';
        celebrationContent.style.transform = 'scale(1)';
    }, 100);
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        celebration.style.opacity = '0';
        setTimeout(() => {
            if (celebration.parentElement) {
                celebration.parentElement.removeChild(celebration);
                document.head.removeChild(style);
            }
        }, 300);
    }, 4000);
    
    // Close on click
    celebration.addEventListener('click', () => {
        celebration.style.opacity = '0';
        setTimeout(() => {
            if (celebration.parentElement) {
                celebration.parentElement.removeChild(celebration);
                document.head.removeChild(style);
            }
        }, 300);
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return `$${amount.toLocaleString()}`;
}

// Modal Functions
function openDonationModal() {
    const modal = document.getElementById('donation-modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeDonationModal() {
    const modal = document.getElementById('donation-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function trackDonationClick(platform) {
    console.log(`Donation link clicked: ${platform}`);
    
    // Show thank you message
    setTimeout(() => {
        showDonationClickFeedback(platform);
        closeDonationModal();
    }, 100);
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('donation-modal');
        if (modal && modal.classList.contains('show')) {
            closeDonationModal();
        }
    }
});

// Export for potential admin interface
window.DiveBarnFinancials = {
    data: financialData,
    update: updateFinancialData,
    celebrate: celebrateMilestone,
    refresh: updateFinancialDisplay,
    openModal: openDonationModal,
    closeModal: closeDonationModal
};

/* 
ADMIN INSTRUCTIONS:
===================

To update the financial progress:

1. Edit the financialData object at the top of this file
2. Update these key values:
   - financialData.raised (total amount raised)
   - financialData.contributors (number of people who contributed)
   - financialData.expenses[].raised (amount raised for each category)
   - financialData.milestones[].current (progress toward each milestone)

3. To mark a milestone as achieved:
   - Set milestone.achieved = true
   - Set milestone.achievedDate = "Month Year"

4. To add a new contribution to the display:
   - Add to the HTML in the "Recent Supporters" section

5. Save the file and refresh the page to see changes

Example update:
financialData.raised = 2500;
financialData.contributors = 35;
financialData.expenses[0].raised = 2000; // Venue category
*/