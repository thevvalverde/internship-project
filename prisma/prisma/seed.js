const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const addAlice = await prisma.client.create({
        data: {
            email: "alice@email.com"
        }
    })

    const addBob = await prisma.client.create({
        data: {
            email: "bob@test.com"
        }
    })

    const addOrg1 = await prisma.organization.create({
        data: {
            contactPhone: "123 456 789",
            contactEmail: "example@org.com"
        }
    })
    const addOrg2 = await prisma.organization.create({
        data: {
            contactPhone: "111 222 333",
            contactEmail: "otherexample@org.com"
        }
    })

    const addPol1 = await prisma.policy.create({
        data: {
            policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
        }
    })
    const addPol2 = await prisma.policy.create({
        data: {
            policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
        }
    })
    const addPol3 = await prisma.policy.create({
        data: {
            policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
        }
    })
    const addPol4 = await prisma.policy.create({
        data: {
            policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
        }
    })

    const addConsent1 = await prisma.consent.create({
        data: {
            description: "This is the consent one description",
            subjectOption: true,
            policyID: 1,
            orgReference: 1,
            subjectId: 1,
            validUntil: new Date('2023-02-28'),
        }
    })
    const addConsent2 = await prisma.consent.create({
        data: {
            description: "This is the second consent",
            subjectOption: false,
            policyID: 2,
            orgReference: 1,
            subjectId: 2,
            validUntil: new Date('2023-02-28'),
        }
    })
    const addConsent3 = await prisma.consent.create({
        data: {
            description: "Yet another consent, the third",
            subjectOption: true,
            policyID: 3,
            orgReference: 2,
            subjectId: 2,
            validUntil: new Date('2029-02-02'),
        }
    })
    const addConsent4 = await prisma.consent.create({
        data: {
            description: "the final one",
            subjectOption: true,
            policyID: 4,
            orgReference: 2,
            subjectId: 2,
            validUntil: new Date('2018-01-15'),
        }
    })
    const addConsent5 = await prisma.consent.create({
        data: {
            description: "the actual final one",
            subjectOption: true,
            policyID: 4,
            orgReference: 2,
            subjectId: 2,
            validUntil: new Date('2018-01-15'),
        }
    })
}


main()
    .catch((e) => {
        console.log(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })