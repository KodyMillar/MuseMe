const logOutForm = document.getElementById('log-out');
logOutForm.addEventListener('submit', handleLogOut);

function handleLogOut(e) {
	console.log("LOGGIN")
	e.preventDefault();

    console.log(e.target.action);

	fetch(e.target.action, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status} HTTP error`)
        }
        return response.json()
    })
	.then((data) => {
        console.log(data.message)
        window.location.href = "/auth/login";
	})
	.catch(err => console.log(err));	
}