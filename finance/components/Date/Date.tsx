export function DateText(){
    const option: any = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    const date: Date = new Date()
    const formatedDate: any = new Intl.DateTimeFormat('en-GB', option).format(date)

    return (
        <p>{formatedDate}</p>
    )
}