document.getElementById('upload-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form element and create FormData object
    var form = event.target;
    var formData = new FormData(form);

    // Send a POST request with form data to the server
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Get the result div element
        var resultDiv = document.getElementById('result');

        // Display the prediction result in the result div
        resultDiv.innerHTML = `<p>Prediction: ${data.prediction}</p>`;

        // You can add more content or styling here if needed
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
});
