import React from "react";

export default class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ""
        }

        this.test = this.test.bind(this)
    }

    componentDidMount() {
        this.test()
    }

    test() {
        fetch("/api/ping")
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        message: "Login Success!"
                    })
                } else {
                    this.setState({
                        message: "Something Wrong"
                    })
                }
            })
            .catch(err => console.log("Error at test.js test()", err))
    }



    render() {
        return (
            <>
                <h1>{this.state.message}</h1>
            </>
        )
    }
}





