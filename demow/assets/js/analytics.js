// Analytics Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts when analytics tab is active
    const analyticsTab = document.querySelector('[data-tab="analytics"]');
    const analyticsContent = document.getElementById('analytics-tab');
    
    if (analyticsTab && analyticsContent) {
        // Initialize charts immediately if analytics tab is active by default
        if (analyticsContent.classList.contains('active')) {
            initializeCharts();
        }
        
        // Initialize charts when clicking on analytics tab
        analyticsTab.addEventListener('click', function() {
            // Small delay to ensure the tab content is visible
            setTimeout(initializeCharts, 100);
        });
    }
});

function initializeCharts() {
    // Registration Trends Chart (Line chart)
    initRegistrationTrendsChart();
    
    // Event Categories Chart (Doughnut chart)
    initCategoriesChart();
    
    // User Engagement Chart (Bar chart)
    initEngagementChart();
    
    // Event Popularity Chart (Radar chart)
    initPopularityChart();
}

function initRegistrationTrendsChart() {
    const ctx = document.getElementById('registrationTrendsChart');
    if (!ctx) return;
    
    // Clear existing chart if any
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Static data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const registrationData = [45, 39, 60, 75, 82, 97, 105, 120, 98, 110, 123, 132];
    
    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Event Registrations',
                data: registrationData,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#2563eb',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    callbacks: {
                        label: function(context) {
                            return `Registrations: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)'
                    },
                    ticks: {
                        stepSize: 30
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

function initCategoriesChart() {
    const ctx = document.getElementById('categoriesChart');
    if (!ctx) return;
    
    // Clear existing chart if any
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Static data for the chart
    const categories = ['Academic', 'Social', 'Sports', 'Cultural', 'Tech', 'Workshop'];
    const categoryData = [28, 16, 24, 18, 22, 12];
    const backgroundColors = [
        'rgba(37, 99, 235, 0.8)',    // Primary blue
        'rgba(6, 182, 212, 0.8)',    // Info cyan
        'rgba(34, 197, 94, 0.8)',    // Success green
        'rgba(245, 158, 11, 0.8)',   // Warning amber
        'rgba(124, 58, 237, 0.8)',   // Purple
        'rgba(236, 72, 153, 0.8)'    // Pink
    ];
    
    ctx.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: categoryData,
                backgroundColor: backgroundColors,
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

function initEngagementChart() {
    const ctx = document.getElementById('engagementChart');
    if (!ctx) return;
    
    // Clear existing chart if any
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Static data for the chart
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const userData = [68, 76, 80, 92, 110, 120, 85];
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Active Users',
                data: userData,
                backgroundColor: 'rgba(37, 99, 235, 0.8)',
                borderRadius: 6,
                borderSkipped: false,
                maxBarThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Active Users: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)'
                    }
                }
            }
        }
    });
}

function initPopularityChart() {
    const ctx = document.getElementById('popularityChart');
    if (!ctx) return;
    
    // Clear existing chart if any
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Static data for the chart
    const categories = ['Academic', 'Social', 'Sports', 'Cultural', 'Tech', 'Workshop'];
    const popularityScores = [85, 92, 76, 88, 95, 78];
    
    ctx.chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Popularity Score',
                data: popularityScores,
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563eb',
                borderWidth: 2,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#2563eb',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        display: false
                    },
                    pointLabels: {
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)'
                    },
                    angleLines: {
                        color: 'rgba(226, 232, 240, 0.5)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.parsed.r}/100`;
                        }
                    }
                }
            }
        }
    });
}

// Function to update charts with real data
async function updateCharts() {
    try {
        // Fetch data from Supabase
        const { data: events, error } = await supabase
            .from('events')
            .select('*');

        if (error) throw error;

        // Process data for charts
        const registrationData = processRegistrationData(events);
        const categoryData = processCategoryData(events);
        const engagementData = processEngagementData(events);
        const popularityData = processPopularityData(events);

        // Update charts with new data
        updateRegistrationChart(registrationData);
        updateCategoriesChart(categoryData);
        updateEngagementChart(engagementData);
        updatePopularityChart(popularityData);

    } catch (error) {
        console.error('Error updating charts:', error);
        showToast('Error updating analytics data', 'error');
    }
}

// Data processing functions
function processRegistrationData(events) {
    // Group events by month and count registrations
    const monthlyData = {};
    events.forEach(event => {
        const month = new Date(event.created_at).toLocaleString('default', { month: 'short' });
        monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    return monthlyData;
}

function processCategoryData(events) {
    // Count events by category
    const categoryCounts = {};
    events.forEach(event => {
        categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
    });
    return categoryCounts;
}

function processEngagementData(events) {
    // Calculate daily active users
    const dailyUsers = {};
    events.forEach(event => {
        const date = new Date(event.created_at).toLocaleDateString('default', { weekday: 'short' });
        dailyUsers[date] = (dailyUsers[date] || 0) + 1;
    });
    return dailyUsers;
}

function processPopularityData(events) {
    // Calculate popularity scores for different categories
    const popularityScores = {};
    events.forEach(event => {
        const category = event.category;
        const score = (event.registered_count || 0) / (event.max_participants || 1);
        popularityScores[category] = (popularityScores[category] || 0) + score;
    });
    return popularityScores;
}

// Chart update functions
function updateRegistrationChart(data) {
    const chart = Chart.getChart('registrationTrendsChart');
    if (chart) {
        chart.data.labels = Object.keys(data);
        chart.data.datasets[0].data = Object.values(data);
        chart.update();
    }
}

function updateCategoriesChart(data) {
    const chart = Chart.getChart('categoriesChart');
    if (chart) {
        chart.data.labels = Object.keys(data);
        chart.data.datasets[0].data = Object.values(data);
        chart.update();
    }
}

function updateEngagementChart(data) {
    const chart = Chart.getChart('engagementChart');
    if (chart) {
        chart.data.labels = Object.keys(data);
        chart.data.datasets[0].data = Object.values(data);
        chart.update();
    }
}

function updatePopularityChart(data) {
    const chart = Chart.getChart('popularityChart');
    if (chart) {
        chart.data.labels = Object.keys(data);
        chart.data.datasets[0].data = Object.values(data);
        chart.update();
    }
}

// Update charts periodically
setInterval(updateCharts, 5 * 60 * 1000); // Update every 5 minutes 