// -------------------- Register Form Validation --------------------
document.addEventListener("DOMContentLoaded", function () {

    // -------------------- Variables --------------------
    const form = document.getElementById('register-form');

    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const submitButton = document.getElementById('submit-button');

    // -------------------- Helper Functions --------------------
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    // First and last name validation
    const isValidName = name => {
        const re = /^[A-Za-z]+$/;
        return re.test(name);
    };

    // Email validation
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Mobile validation (10 digits)
    const isValidMobile = mobile => {
        const re = /^\d{10}$/;
        return re.test(String(mobile));
    };

    // -------------------- Field-Specific Real-Time Validation --------------------
    // First Name 
    const validateFirstName = function() {
        const firstnameValue = firstname.value.trim();

        if (firstnameValue === '') {
            setError(firstname, 'Please enter your first name');
        } else if (!isValidName(firstnameValue)) {
            setError(firstname, 'First name must only contain letters');
        } else {
            setSuccess(firstname);
        }
    };

    // Last Name
    const validateLastName = function() {
        const lastnameValue = lastname.value.trim();

        if (lastnameValue === '') {
            setError(lastname, 'Please enter your last name');
        } else if (!isValidName(lastnameValue)) {
            setError(lastname, 'Last name must only contain letters');
        } else {
            setSuccess(lastname);
        }
    };

    // Email
    const validateEmail = function() {
        const emailValue = email.value.trim();

        if (emailValue === '') {
            setError(email, 'Email address is required');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Please enter a valid email address');
        } else {
            setSuccess(email);
        }
    };

    // Mobile
    const validateMobile = function() {
        const mobileValue = mobile.value.trim();

        if (mobileValue === '') {
            setError(mobile, 'Mobile number is required');
        } else if (!isValidMobile(mobileValue)) {
            setError(mobile, 'Please enter a valid mobile number');
        } else {
            setSuccess(mobile);
        }
    };

    // Password
    const validatePasswordField = function() {
        const passwordValue = password.value.trim();

        if (passwordValue === '') {
            setError(password, 'Password is required');
        } else if (passwordValue.length < 6 || passwordValue.length > 12) {
            setError(password, 'Password must be between 6 and 12 characters');
        } else {
            setSuccess(password);
        }
    };

    // Confirm Password
    const validateConfirmPasswordField = function() {
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();

        if (confirmPasswordValue === '') {
            setError(confirmPassword, 'Please confirm your password');
        } else if (confirmPasswordValue !== passwordValue) {
            setError(confirmPassword, 'Passwords do not match');
        } else {
            setSuccess(confirmPassword);
        }
    };

    // -------------------- Final Form-Wide Validation --------------------
    const validateInputs = () => {
        // This runs all field validations once more
        validateFirstName();
        validateLastName();
        validateEmail();
        validateMobile();
        validatePasswordField();
        validateConfirmPasswordField();

        // Check for any input with an error class
        const hasError = document.querySelector('.input-box.error');
        return !hasError;
    };

    // -------------------- Display Success Message --------------------
    const displaySuccessMessage = function() {
        let existingMessage = document.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();

        // Create a new paragraph for success message
        const successMessage = document.createElement('p');
        successMessage.classList.add('success-message');
        successMessage.textContent = "Registration successful!";

        // Position success message underneath the submit button
        form.insertBefore(successMessage, submitButton.nextSibling);
    };
    

    // -------------------- Main Script for Register Page --------------------

    // Check if we are on the Register page
    if (document.getElementById("register-page")) {
        console.log("Register page detected. Running validation script...");

        // Real-time validation for each field
        firstname.addEventListener('input', validateFirstName);
        lastname.addEventListener('input', validateLastName);
        email.addEventListener('input', validateEmail);
        mobile.addEventListener('input', validateMobile);
        password.addEventListener('input', validatePasswordField);
        confirmPassword.addEventListener('input', validateConfirmPasswordField);
        
        // Final validation check on submit
        if (form) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                
                // Display success message and reset the form after successful validation
                if (validateInputs()) {
                    displaySuccessMessage();
                    form.reset();
                    
                    // Clear error and success messages
                    document.querySelectorAll('.input-box').forEach((inputControl) => {
                        inputControl.classList.remove('error', 'success');
                        const errorDisplay = inputControl.querySelector('.error');
                        if (errorDisplay) {
                            errorDisplay.innerText = '';
                        }
                    });
                }
            });
        }
    }
});

// -------------------- Books Page --------------------
document.addEventListener("DOMContentLoaded", function () {
    // Only run this script on the Books page
    if (document.getElementById("books-page")) {
        console.log("Books page detected. Running scripts...");

        // -------------------- Data Link for Table Links --------------------

        // Book Stats table row links to Books List table
        const statsRows = document.querySelectorAll('.stats-table tbody tr');
        statsRows.forEach(row => {
            row.addEventListener('click', () => {
                const link = row.getAttribute('data-link');
                if (link) {
                    window.location.href = link; // Navigate to the top of the selected table
                }
            });
        });

        // Book List table row external links
        const bookRows = document.querySelectorAll('.book-table tbody tr');
        bookRows.forEach(row => {
            row.addEventListener('click', function () {
                const href = this.getAttribute('data-href');
                if (href) {
                    window.open(href, '_blank'); // Opens link in a new tab
                }
            });
        });

        // -------------------- Inserting Book Table Data --------------------
        const jsonFilePath = 'https://ket192.github.io/my-json-host/book_list.json';

        // Fetch the JSON data
        fetch(jsonFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // To debug and check if data loads correctly
                populateTables(data);
            })
            .catch(error => {
                console.error('Error loading the JSON file:', error);
            });

        // Populates all Book Table class tables based on data-year attribute
        const populateTables = function(data) {
            const tables = document.querySelectorAll('.book-table');

            // Loop through each table and get data-year attribute
            tables.forEach(table => {
                const year = table.getAttribute('data-year');

                // Filter the data to match the table year
                const filteredData = data.filter(item => item.Year === parseInt(year));

                // Clear any existing rows before adding new data
                const tableBody = table.querySelector('tbody');
                tableBody.innerHTML = ''; 

                // Populate the tables with filtered data from JSON file and add class to style rows
                filteredData.forEach(item => {
                    const row = document.createElement('tr');
                    row.classList.add('active-row');

                    // data-href attribute for clickable row links
                    row.setAttribute('data-href', item.Link);

                    // Dynamically create table row content
                    row.innerHTML = `
                        <td><img src="${item.coverImage}" alt="${item.title} cover art" width="80"></td>
                        <td>${item.title}</td>
                        <td>${item.author}</td>
                        <td>${item.narrator}</td>
                        <td>${item.length}</td>
                    `;

                    // Add the newly created row to the table
                    tableBody.appendChild(row); 
                });

                // Event listener to open links in a new tab
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    row.addEventListener('click', function () {
                        const href = this.getAttribute('data-href');
                        if (href) {
                            window.open(href, '_blank'); // Opens the link in a new tab
                        }
                    });
                });
            });
        };

        // -------------------- Scroll to Top Button --------------------
        const scrollButton = document.getElementById('scroll-button');

        // Display scroll button if page scrolls down more than 300px from the top
        if (scrollButton) {
            window.addEventListener('scroll', function () {
                if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                    scrollButton.style.display = 'block';
                } else {
                    scrollButton.style.display = 'none';
                }
            });

            // Smooth scroll to top when the button is clicked
            scrollButton.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
});

