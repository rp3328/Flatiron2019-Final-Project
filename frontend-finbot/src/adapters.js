class LocalAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.headers = {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }

    postLogin = (body) => {
        return fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    }

    postUser = (user) => {
        return fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(user)
        })
        .then(res => res.json())
    }

    postPlan = (plan) => {
        return fetch(`${this.baseUrl}/plans`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(plan)
        })
        .then(res => res.json())
    }

    postAsset = (asset) => {
        return fetch(`${this.baseUrl}/assets`,{
            method: "POST", 
            headers: this.headers,
            body: JSON.stringify(asset)
            })
            .then(res => res.json())
    }

    getValue = () => {
        return fetch(`${this.baseUrl}/users/${localStorage.user_id}/getValue`)
        .then(res => res.json())
    }

    getPlanChart = () => {
        return fetch(`${this.baseUrl}/plans/${localStorage.plan_id}/chart`)
        .then(res => res.json())
    }

    getUser = () => {
        return fetch(`${this.baseUrl}/users/${localStorage.user_id}`)
        .then(resp => resp.json())
    }

    patchPlan = (plan) => {
        return fetch(`${this.baseUrl}/plans/${plan_id}`,{
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(plan)
            })
            .then(res => res.json())
    
    }

    patchUser = (user) => {
        return fetch(`${BASE_URL}/users/${localStorage.user_id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(
                user
            )
        })
        .then(res => res.json())
    }

}