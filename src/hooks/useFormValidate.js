import { useState, useEffect, useMemo } from "react"

const useFormValidate = () => {
    const [username, setUsername] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [usernameIsTouched, setUsernameIsTouched] = useState(false)
    const [emailIsTouched, setEmailIsTouched] = useState(false)
    let usernameIsValid = useMemo(() => {
        if (username !== undefined) {
            setUsernameIsTouched(false)
            if (username.trim().length > 5) return true
            return false
        }
    }, [username])
    let emailIsValid = useMemo(() => {
        if (email !== undefined) {
            setEmailIsTouched(false)
            if (email.trim().length > 8 && email.includes('@')) return true
            return false
        }
    }, [email])

    return {
        methods: {
            setUsername,
            setEmail,
            setUsernameIsTouched,
            setEmailIsTouched
        },
        validations: {
            usernameIsValid,
            emailIsValid,
            formIsValid: emailIsValid && usernameIsValid
        },
        triggeres: {
            usernameIsTouched,
            emailIsTouched
        }
    }
}
export default useFormValidate