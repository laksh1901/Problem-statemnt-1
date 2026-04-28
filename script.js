// Fetch data from a public API using async/await

// Function to fetch and display user data
async function fetchUserData() {
  try {
    // Show loading message
    console.log('Loading user data...');
    
    // Fetch data from JSONPlaceholder API
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON data
    const userData = await response.json();
    
    // Display the data
    console.log('User Data:', userData);
    displayUserInfo(userData);
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Function to fetch and display posts
async function fetchPosts() {
  try {
    console.log('Loading posts...');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    console.log('Posts:', posts);
    displayPosts(posts);
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Function to fetch multiple resources in parallel
async function fetchMultipleResources() {
  try {
    console.log('Loading multiple resources...');
    
    // Fetch users, posts, and comments in parallel
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=3'),
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')
    ]);
    
    // Check all responses
    if (!usersResponse.ok || !postsResponse.ok || !commentsResponse.ok) {
      throw new Error('One or more API requests failed');
    }
    
    // Parse all responses
    const [users, posts, comments] = await Promise.all([
      usersResponse.json(),
      postsResponse.json(),
      commentsResponse.json()
    ]);
    
    console.log('All Resources:', { users, posts, comments });
    displayMultipleResources({ users, posts, comments });
    
  } catch (error) {
    console.error('Error fetching multiple resources:', error);
  }
}

// Display user information
function displayUserInfo(user) {
  const output = `
    ========== USER INFO ==========
    Name: ${user.name}
    Email: ${user.email}
    Phone: ${user.phone}
    Website: ${user.website}
    Company: ${user.company.name}
    ================================
  `;
  console.log(output);
}

// Display posts
function displayPosts(posts) {
  console.log('\n========== POSTS ==========');
  posts.forEach((post, index) => {
    console.log(`
    Post ${index + 1}:
    Title: ${post.title}
    Body: ${post.body}
    ----`);
  });
  console.log('==========================\n');
}

// Display multiple resources
function displayMultipleResources(data) {
  console.log('\n========== MULTIPLE RESOURCES ==========');
  console.log(`Total Users: ${data.users.length}`);
  console.log(`Total Posts: ${data.posts.length}`);
  console.log(`Total Comments: ${data.comments.length}`);
  console.log('========================================\n');
}

// Example: Fetch with custom headers and POST request
async function fetchWithPostRequest() {
  try {
    console.log('Creating a new post...');
    
    const newPost = {
      title: 'My New Post',
      body: 'This is a test post created with fetch API',
      userId: 1
    };
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Post created successfully:', result);
    
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Run examples
async function runAllExamples() {
  console.log('=== API FETCH EXAMPLES ===\n');
  
  await fetchUserData();
  console.log('\n---\n');
  
  await fetchPosts();
  console.log('\n---\n');
  
  await fetchMultipleResources();
  console.log('\n---\n');
  
  await fetchWithPostRequest();
}

// Execute if running in Node.js
if (typeof module !== 'undefined' && module.exports) {
  runAllExamples();
}
