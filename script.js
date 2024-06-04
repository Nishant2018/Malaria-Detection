document.addEventListener('DOMContentLoaded', function () {
    var dropZone = document.getElementById('drop-zone');
    var fileInput = document.getElementById('file-input');
    var uploadForm = document.getElementById('upload-form');

    // Handle drag over
    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('dragging');
    });

    // Handle drag leave
    dropZone.addEventListener('dragleave', function (e) {
        dropZone.classList.remove('dragging');
    });

    // Handle file drop
    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('dragging');
        var files = e.dataTransfer.files;
        fileInput.files = files;

        // Optional: Display the file name
        var fileName = files[0].name;
        dropZone.querySelector('p').textContent = fileName;
    });

    // Handle click on drop zone
    dropZone.addEventListener('click', function () {
        fileInput.click();
    });

    // Handle file input change
    fileInput.addEventListener('change', function () {
        var fileName = fileInput.files[0].name;
        dropZone.querySelector('p').textContent = fileName;
    });

    // Handle form submission
    uploadForm.addEventListener('submit', function (event) {
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
});
