export async function load({locals, depends}) {
    depends("app:auth")
    return {
        user: locals.user
    }
}