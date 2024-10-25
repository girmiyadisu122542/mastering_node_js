console.log('Before');

// const user = getUser(1);
// console.log(user); 

//using callback
//This function returns undefined
// function getUser(id) {
//     setTimeout(() => {
//         console.log('Reading data from the database');
//         return { id: id, name: 'Girmay' };
//     }, 2000);
// }

getUser(1,  getRepositories)
console.log('After');

function getRepositories(user) {
    // console.log('User: ', user);
    getRepositories(user.name, getCommits);

}
function getCommits(repos) {
    console.log('Repos: ', repos);
    getCommits(repos, displayCommits)
}
function displayCommits(commits) {
    console.log(commits);
}

//Using callback

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading data from the database...');
        callback({ id: id, name: 'Girmay' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`${username} Repositories:`);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log(`${repo} Commits:`);
        callback(['commit1', 'commit2', 'Commit3']);
    }, 2000)
}
