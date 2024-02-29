export const getTrendings = async (value: string) => {
    try{
        const response: Response = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=15`, {
            headers: {
                "Authorization" : "gNmvSlQY6yU4Z2Z4vmxIkmNI1RhDdA3uonxDMrjP5gfQpqwAhOb89Dba"
            }
        });
        return response.json()
    }
    catch(error) {
        console.log(error)
    }
}