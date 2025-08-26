// Demo Script - Automatic Testing for Dev Login
// Paste this in browser console for automated demo

console.log('🎬 Starting Dev Login Demo...');

// Demo configuration
const DEMO_CONFIG = {
    autoFillDelay: 1000,
    submitDelay: 2000,
    redirectDelay: 3000,
    messageDelay: 500
};

// Demo functions
const DemoScript = {
    
    // Auto demo for login page
    demoLoginPage: function() {
        console.log('📝 Demo: Auto-filling login credentials...');
        
        setTimeout(() => {
            // Fill username
            const usernameField = document.getElementById('form-username');
            if (usernameField) {
                usernameField.value = 'devadmin';
                usernameField.style.backgroundColor = '#e8f5e8';
                console.log('✅ Username filled');
            }
        }, DEMO_CONFIG.messageDelay);
        
        setTimeout(() => {
            // Fill password
            const passwordField = document.getElementById('form-password');
            if (passwordField) {
                passwordField.value = 'dev123456';
                passwordField.style.backgroundColor = '#e8f5e8';
                console.log('✅ Password filled');
            }
        }, DEMO_CONFIG.autoFillDelay);
        
        setTimeout(() => {
            // Fill captcha
            const captchaField = document.getElementById('CaptchaInputText');
            if (captchaField) {
                captchaField.value = 'dev';
                captchaField.style.backgroundColor = '#e8f5e8';
                console.log('✅ Captcha bypassed');
            }
        }, DEMO_CONFIG.autoFillDelay + 500);
        
        setTimeout(() => {
            console.log('🚀 Demo: Submitting form...');
            // Submit form
            const form = document.getElementById('formgr');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }, DEMO_CONFIG.submitDelay);
    },
    
    // Auto demo for dashboard
    demoDashboard: function() {
        console.log('📊 Demo: Testing dashboard navigation...');
        
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        let currentIndex = 0;
        
        const testNavigation = () => {
            if (currentIndex < navLinks.length) {
                const link = navLinks[currentIndex];
                const page = link.getAttribute('data-page');
                
                console.log(`🔗 Testing navigation: ${page}`);
                link.click();
                
                setTimeout(() => {
                    currentIndex++;
                    testNavigation();
                }, 2000);
            } else {
                console.log('✅ Dashboard navigation demo completed');
                this.demoSidebarToggle();
            }
        };
        
        testNavigation();
    },
    
    // Demo sidebar toggle
    demoSidebarToggle: function() {
        console.log('📱 Demo: Testing sidebar toggle...');
        
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            // Toggle sidebar multiple times
            let toggleCount = 0;
            const maxToggles = 4;
            
            const toggleSidebar = () => {
                if (toggleCount < maxToggles) {
                    menuToggle.click();
                    console.log(`🔄 Sidebar toggle ${toggleCount + 1}/${maxToggles}`);
                    toggleCount++;
                    
                    setTimeout(toggleSidebar, 1000);
                } else {
                    console.log('✅ Sidebar toggle demo completed');
                }
            };
            
            toggleSidebar();
        }
    },
    
    // Demo messages
    demoMessages: function() {
        console.log('💬 Demo: Testing notification system...');
        
        const messageTypes = ['success', 'error', 'warning', 'info'];
        let messageIndex = 0;
        
        const showTestMessage = () => {
            if (messageIndex < messageTypes.length) {
                const type = messageTypes[messageIndex];
                const message = `This is a ${type} message demo`;
                
                // Call showMessage function if available
                if (typeof showMessage === 'function') {
                    showMessage(message, type);
                    console.log(`📨 Showed ${type} message`);
                }
                
                messageIndex++;
                setTimeout(showTestMessage, 2000);
            } else {
                console.log('✅ Message system demo completed');
            }
        };
        
        showTestMessage();
    },
    
    // Auto-run detection and demo starter
    autoStart: function() {
        console.log('🔍 Detecting current page...');
        
        // Check if on login page
        if (document.getElementById('formgr')) {
            console.log('📍 Detected: Login Page');
            console.log('🎯 Starting login demo in 2 seconds...');
            setTimeout(() => this.demoLoginPage(), 2000);
        }
        
        // Check if on dashboard
        else if (document.querySelector('.sidebar')) {
            console.log('📍 Detected: Dashboard Page');
            console.log('🎯 Starting dashboard demo in 2 seconds...');
            setTimeout(() => {
                this.demoMessages();
                setTimeout(() => this.demoDashboard(), 5000);
            }, 2000);
        }
        
        // Unknown page
        else {
            console.log('❓ Unknown page - manual demo required');
            this.showManualInstructions();
        }
    },
    
    // Show manual instructions
    showManualInstructions: function() {
        console.log(`
🎬 MANUAL DEMO INSTRUCTIONS:

For Login Page:
- Run: DemoScript.demoLoginPage()

For Dashboard:
- Run: DemoScript.demoDashboard()
- Run: DemoScript.demoMessages()
- Run: DemoScript.demoSidebarToggle()

For Auto-detection:
- Run: DemoScript.autoStart()
        `);
    },
    
    // Performance testing
    performanceTest: function() {
        console.log('⚡ Running performance tests...');
        
        const startTime = performance.now();
        
        // Test DOM queries
        const testSelectors = [
            '#form-username',
            '.nav-link',
            '.sidebar',
            '.header',
            '.content-area'
        ];
        
        testSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            console.log(`🔍 Selector "${selector}": ${elements.length} elements found`);
        });
        
        const endTime = performance.now();
        console.log(`⏱️ Performance test completed in ${(endTime - startTime).toFixed(2)}ms`);
    },
    
    // Session testing
    sessionTest: function() {
        console.log('🔐 Testing session management...');
        
        const sessionKeys = ['isLoggedIn', 'username', 'loginTime', 'userType'];
        
        sessionKeys.forEach(key => {
            const value = sessionStorage.getItem(key);
            console.log(`📝 ${key}: ${value || 'Not set'}`);
        });
        
        // Test session creation
        console.log('🧪 Creating test session...');
        sessionStorage.setItem('testKey', 'testValue');
        
        // Test session reading
        const testValue = sessionStorage.getItem('testKey');
        console.log(`✅ Test session read: ${testValue}`);
        
        // Clean up
        sessionStorage.removeItem('testKey');
        console.log('🧹 Test session cleaned up');
    }
};

// Expose to global scope
window.DemoScript = DemoScript;

// Auto-start demo
console.log('🎭 Demo script loaded! Auto-starting in 1 second...');
setTimeout(() => DemoScript.autoStart(), 1000);

// Show available functions
console.log(`
🎮 AVAILABLE DEMO FUNCTIONS:

DemoScript.demoLoginPage()     - Auto-fill and submit login
DemoScript.demoDashboard()     - Test dashboard navigation  
DemoScript.demoMessages()      - Test notification system
DemoScript.demoSidebarToggle() - Test sidebar functionality
DemoScript.performanceTest()   - Run performance tests
DemoScript.sessionTest()       - Test session management
DemoScript.autoStart()         - Auto-detect and run appropriate demo

🎯 Demo will auto-start based on current page!
`);
