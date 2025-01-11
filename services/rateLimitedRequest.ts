const RATE_LIMIT = 5; // Example rate limit
let requestCount = 0;

export const rateLimitedRequest = async (requestFunction: () => Promise<any>) => {
  if (requestCount >= RATE_LIMIT) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    requestCount = 0; // Reset count after waiting
  }
  requestCount++;
  return requestFunction(); // Call the provided request function
}; 