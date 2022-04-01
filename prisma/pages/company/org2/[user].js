import Policy from "../../../components/Policy"
import prisma from "../../../prisma/client" 

export default function User({client, consents, policy}) {
    return <div>
        <h1>Hello, {client.name}</h1>
        <Policy clientID={client.clientID} consents={consents} policy={policy} orgId={2}/>
    </div>

}





export async function getStaticPaths() {

    const consents = await prisma.consent.findMany({where: {orgReference: 2}})
    const clients = await Promise.all(consents.map(async consent => await prisma.client.findUnique({where: {clientID: consent.subjectId}})))


    const paths = clients.map(client => ({params: {user: ""+ client.clientID}}))

    console.log(paths);

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {user}}) {

    const client = await prisma.client.findFirst({where: {clientID: parseInt(user)}})
    const consents = await prisma.consent.findMany({where: {subjectId: parseInt(user), orgReference: 2}})
    const policy = await prisma.policy.findFirst({where: {policyID: consents[0].policyID}})

    return {
        props: {
            client,
            consents,
            policy
        }
    }
}

