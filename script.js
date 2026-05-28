// MUST UPDATE: Change this to your actual GitHub username!
const githubUsername = 'Rafayumar-sci'; 
const repoContainer = document.getElementById('repo-container');

async function fetchGitHubRepos() {
    try {
        // Fetch public repos, sorted by recently updated, limited to 6
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const repos = await response.json();
        
        // Clear the "Loading..." text
        repoContainer.innerHTML = '';

        // Generate a card for each repository
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition duration-300 flex flex-col justify-between';
            
            card.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold text-white mb-2">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition">
                            ${repo.name}
                        </a>
                    </h3>
                    <p class="text-slate-400 text-sm mb-4 line-clamp-2">
                        ${repo.description || 'No description provided.'}
                    </p>
                </div>
                <div class="flex items-center justify-between text-xs text-slate-500 mt-4">
                    <div class="flex items-center space-x-3">
                        <span class="flex items-center gap-1">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            ${repo.stargazers_count}
                        </span>
                        <span>${repo.language || 'N/A'}</span>
                    </div>
                </div>
            `;
            repoContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching repos:', error);
        repoContainer.innerHTML = '<p class="text-red-400 col-span-full">Failed to load repositories. Please check the GitHub username.</p>';
    }
}

// Run the function when the page loads
fetchGitHubRepos();