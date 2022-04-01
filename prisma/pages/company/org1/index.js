import prisma from "../../../prisma/client"
import Link from "next/link"

export default function Org1({orgInfo, subjectsUnique}) {
    return <div>
        <h1>This is company 1</h1>
        <p>Our contact phone is {orgInfo.contactPhone}</p>
        <p>Our contact email is {orgInfo.contactEmail}</p>
        <h1>Who are you?</h1>
        <ul>
            {subjectsUnique.map(subject => <li key={subject.clientID}><Link href={"/company/org1/"+subject.clientID}><a>{subject.name}</a></Link></li>)
            }
        </ul>
    </div>
}

export async function getStaticProps() {
    const orgInfo  = await prisma.organization.findUnique({where: {organizationID: 1}})
    const consents = await prisma.consent.findMany({where: {orgReference: orgInfo.organizationID}})
    const mapSubjects = consents.map((consent) => 
        new Promise(resolve =>
            resolve(prisma.client.findUnique({where: {clientID: consent.subjectId}}))
        ))


    const subjects = await Promise.all(mapSubjects)

    console.log("subjects: " + subjects);

    const subjectsUnique = [...new Map(subjects.map(v => [v.clientID, v])).values()]


    return {
        props: {
            orgInfo,
            subjectsUnique
        }
    }

}