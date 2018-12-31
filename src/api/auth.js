export class Auth {
    static saveData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
    }

    static isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    static getUsername() {
        return localStorage.getItem('username');
    }

    static getUserId() {
        return localStorage.getItem('userId');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getRole() {
        return localStorage.getItem('role');
    }

    static isAdmin() {
        return localStorage.getItem('role') === 'ADMIN';
    }

    static isInstructor() {
        return localStorage.getItem('role') === 'INSTRUCTOR';
    }

    static isClient() {
        return localStorage.getItem('role') === 'CLIENT';
    }

    static logout() {
        localStorage.clear();
    }
}
