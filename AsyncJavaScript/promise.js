// const p = new Promise( (resolve, reject) =>{
//     setTimeout(() => {
//         // resolve(1); //Pending => resolved, fullfiled

//         reject(new Error('Error Happen!'));
//     }, 2000);
// })
// p
// .then(result => console.log('Result: ', result))
// .catch(err => console.log('Error: ', err.message));

/*  This is using callback functions
console.log('Before');
getUser(1, (user) => {
    // console.log(user);
    getRepositories(user.githubUsername, (repo) => {
        console.log(repo);
        getCommits(repo[0], (commits) => {
            console.log(commits);
        });
    });
});

console.log('After');
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading data from the database...');

        callback({ id: id, githubUsername: 'Girmay' });
    }, 2000);
}
function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(`${username} Repos:`);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
function getCommits(repo, callback) {
    setTimeout(() => {
        console.log(`${repo} Commits:`);
        callback(['commit1', 'Commit2']);
    }, 2000);
}
*/

//Using Promises

console.log('Before');
// getUser(1)
// .then(user => {
//     console.log(user)
//     getRepositories(user.githubUsername)
//     .then(repo => {
//         console.log(repo);
//         getCommits(repo[0])
//         .then(commits => console.log(commits));
//     });
// });

getUser(1)
 .then(user => getRepositories(user.githubUsername))
 .then(repos => getCommits(repos[0]))
 .then(commits => console.log('Commits: ', commits))
 .catch(err => console.log('Error: ', err.message));
console.log('After');
function getUser(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading data from the database...');
            resolve({ id: id, githubUsername: 'Girmay' });
        }, 2000);
    })

}
function getRepositories(username) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log(`${username} Repos:`);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
   
}
function getCommits(repo) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log(`${repo} Commits:`);
            resolve(['commit1', 'Commit2']);
        }, 2000);
    })
   
}

