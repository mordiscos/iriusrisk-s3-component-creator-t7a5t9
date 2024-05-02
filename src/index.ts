// Import necessary modules (Assuming these exist in your SDK or environment setup)
import axios from 'axios';

// Define the base URL for the IriusRisk API
const API_BASE_URL = 'https://api.iriusrisk.com/api/v1/security-content';

// Define the component data for the AWS S3 Bucket
const s3BucketComponent = {
    ref: "aws-s3-bucket",
    name: "AWS S3 Bucket",
    desc: "A cloud storage resource available in AWS that allows you to store a variety of files and data.",
    visible: true,
    category: {
        name: "Cloud Storage"
    },
    riskPatterns: [
        {
            libraryRef: "lib-001",
            ref: "risk-001"
        }
    ]
};

// Function to create a new component definition
async function createComponent(componentData: any): Promise<void> {
    try {
        // Making a POST request to the IriusRisk API to create the component
        const response = await axios.post(`${API_BASE_URL}/components`, componentData);
        
        // Check if the component was created successfully
        if (response.status === 201) {
            console.log('Component created successfully:', response.data);
        } else {
            console.log('Unexpected response status:', response.status);
        }
    } catch (error: any) {
        // Handle errors in the request
        console.error('Error creating component:', error.response?.data || error.message);
    }
}

// Function to verify the created component
async function verifyComponent(componentRef: string): Promise<void> {
    try {
        // Making a GET request to retrieve the component
        const response = await axios.get(`${API_BASE_URL}/components/${componentRef}`);
        
        if (response.status === 200) {
            console.log('Component verification successful:', response.data);
        } else {
            console.log('Failed to retrieve component:', response.status);
        }
    } catch (error: any) {
        // Handle errors in the request
        console.error('Error verifying component:', error.response?.data || error.message);
    }
}

// Main function to execute the component creation and verification
async function main() {
    await createComponent(s3BucketComponent);
    await verifyComponent(s3BucketComponent.ref);
}

// Execute the main function
main();
