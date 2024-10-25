

// getUser(1)
//  .then(user => getRepositories(user.githubUsername))
//  .then(repos => getCommits(repos[0]))
//  .then(commits => console.log('Commits: ', commits))
//  .catch(err => console.log('Error: ', err.message));


async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);

    }
    catch(err) { console.log('Error', err.message); }
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading data from the database...');
            resolve({ id: id, githubUsername: 'Girmay' });
        }, 2000);
    })

}
function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${username} Repos:`);
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('Cannot find The repositories'))
        }, 2000);
    })

}
function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${repo} Commits:`);
            resolve(['commit1', 'Commit2']);
        }, 2000);
    })

}