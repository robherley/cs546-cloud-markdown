const handleRegister = () => {
	const name = `${firstName.value} ${initial.value} ${lastName.value}`
		.replace(/\s\s+/g, ' ')
		.trim();
	axios
		.post('/api/v1/user/register', {
			name,
			email: email.value,
			username: username.value,
			password: password.value,
			passConfirm: passconfirm.value
		})
		.then(res => {
			toastr.success('Redirecting to Login...');
			setTimeout(() => window.location.replace('/login'), 1500);
		})
		.catch(err => {
			const errors = err.response.data.error;
			if (typeof errors === 'string') {
				toastr.error(errors);
			} else {
				for (err of errors) {
					toastr.error(err.msg);
				}
			}
		});
};

const handleLogin = () => {
	axios
		.post('/api/v1/user/login', {
			username: username.value,
			password: password.value
		})
		.then(res => {
			toastr.success('Logging In...');
			setTimeout(() => window.location.replace('/'), 1500);
		})
		.catch(err => {
			const errors = err.response.data.error;
			if (typeof errors === 'string') {
				toastr.error(errors);
			} else {
				for (err of errors) {
					toastr.error(err.msg);
				}
			}
		});
};

window.onload = () => {
	toastr.options = {
		positionClass: 'toast-top-center',
		progressBar: true,
		timeOut: 2500
	};
	if (document.getElementById('regButton')) {
		regButton.addEventListener('click', () => {
			handleRegister();
		});
		document.addEventListener('keypress', e => {
			if (13 == e.keyCode) handleRegister();
		});
	}
	if (document.getElementById('logButton')) {
		logButton.addEventListener('click', () => {
			handleLogin();
		});
		document.addEventListener('keypress', e => {
			if (13 == e.keyCode) handleLogin();
		});
	}
	particlesJS.load('particles', 'particles.json', () => {
		console.log('Particles.js Loaded!');
	});
};
