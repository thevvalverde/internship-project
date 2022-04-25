const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // const addAlice = await prisma.client.create({
    //     data: {
    //         email: "alice@email.com"
    //     }
    // })

    // const addBob = await prisma.client.create({
    //     data: {
    //         email: "bob@test.com"
    //     }
    // })

    // const addOrg1 = await prisma.organization.create({
    //     data: {
    //         contactPhone: "123 456 789",
    //         contactEmail: "example@org.com"
    //     }
    // })
    // const addOrg2 = await prisma.organization.create({
    //     data: {
    //         contactPhone: "111 222 333",
    //         contactEmail: "otherexample@org.com"
    //     }
    // })

    // const addPol1 = await prisma.policy.create({
    //     data: {
    //         policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
    //     }
    // })
    // const addPol2 = await prisma.policy.create({
    //     data: {
    //         policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
    //     }
    // })
    // const addPol3 = await prisma.policy.create({
    //     data: {
    //         policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
    //     }
    // })
    // const addPol4 = await prisma.policy.create({
    //     data: {
    //         policy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, est eu viverra faucibus, justo nisl vulputate lorem, eu venenatis felis odio eget orci. Vestibulum elit metus, tristique a cursus eget, aliquam eu dui. Mauris cursus eu augue eget ullamcorper. Aenean rutrum tortor ac lorem suscipit, sit amet iaculis metus ornare. Donec et nibh convallis, ultricies lectus sed, lobortis ligula. Aliquam sed metus id metus venenatis tincidunt. Nulla nec lorem neque. Fusce blandit blandit aliquam. Praesent sagittis ante in malesuada rhoncus. Integer lacinia pretium tortor eget fringilla. Sed ac condimentum sem, eu faucibus odio. Quisque vel dapibus tellus, ac pulvinar dolor. Integer aliquet luctus tellus vitae auctor. Duis molestie, nunc in tempus pulvinar, velit tellus volutpat turpis, sit amet condimentum velit tortor a arcu. Ut accumsan, dui a pretium aliquet, metus lectus vulputate quam, sit amet malesuada nisl risus ac enim."
    //     }
    // })

    // const addConsent1 = await prisma.consent.create({
    //     data: {
    //         description: "This is the consent one description",
    //         subjectOption: true,
    //         policyID: 1,
    //         orgReference: 1,
    //         subjectId: 1,
    //         validUntil: new Date('2023-02-28'),
    //     }
    // })
    // const addConsent2 = await prisma.consent.create({
    //     data: {
    //         description: "This is the second consent",
    //         subjectOption: false,
    //         policyID: 2,
    //         orgReference: 1,
    //         subjectId: 2,
    //         validUntil: new Date('2023-02-28'),
    //     }
    // })
    // const addConsent3 = await prisma.consent.create({
    //     data: {
    //         description: "Yet another consent, the third",
    //         subjectOption: true,
    //         policyID: 3,
    //         orgReference: 2,
    //         subjectId: 2,
    //         validUntil: new Date('2029-02-02'),
    //     }
    // })
    // const addConsent4 = await prisma.consent.create({
    //     data: {
    //         description: "the final one",
    //         subjectOption: true,
    //         policyID: 4,
    //         orgReference: 2,
    //         subjectId: 2,
    //         validUntil: new Date('2018-01-15'),
    //     }
    // })
    // const addConsent5 = await prisma.consent.create({
    //     data: {
    //         description: "the actual final one",
    //         subjectOption: true,
    //         policyID: 4,
    //         orgReference: 2,
    //         subjectId: 2,
    //         validUntil: new Date('2018-01-15'),
    //     }
    // })
    // const addDefault1 = await prisma.defaultData.create({
    //     data: {
    //         orgReference: 2,
            // defaultPolicy: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains",
    //         defaultConsents: [
    //             JSON.stringify({
    //                 description: "I consent to something and I agree to something else",
    //                 subjectOption: false,
    //                 validUntil: new Date('2029-02-28')
    //             }),
    //             JSON.stringify({
    //                 description: "I agree that this is a consent text",
    //                 subjectOption: false,
    //                 validUntil: new Date('2029-02-28')
    //             }),
    //             JSON.stringify({
    //                 description: "I consent to reading this sample text",
    //                 subjectOption: false,
    //                 validUntil: new Date('2029-02-28')
    //             }),
    //             JSON.stringify({
    //                 description: "I am a human being",
    //                 subjectOption: false,
    //                 validUntil: new Date('2029-02-28')
    //             }),
    //             JSON.stringify({
    //                 description: "I concurr that this is one of the options ever written",
    //                 subjectOption: false,
    //                 validUntil: new Date('2029-02-28')
    //             }),
    //         ]
    //     }
    // })
    const addDefault2 = await prisma.defaultData.create({
        data: {
            orgReference: 2,
            defaultPolicy: "Cras fermentum rhoncus nisi id ultricies. Praesent laoreet velit tellus, interdum pellentesque turpis finibus non. Sed quis gravida mauris. Mauris consectetur mauris ac dolor rutrum vestibulum. Aenean tincidunt ante at ipsum imperdiet sagittis. Nunc ante velit, consectetur ut elit sit amet, finibus porta ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Praesent ornare feugiat massa ac tempor. Proin pretium, magna porttitor egestas tempor, nibh velit ornare nisi, quis sodales nulla elit id ante. Sed eleifend consequat arcu, id lacinia elit porta sed.",
            defaultConsents: [
                JSON.stringify({
                    description: "Other company default consents!",
                    subjectOption: false,
                    validUntil: new Date('2029-02-28')
                }),
                JSON.stringify({
                    description: "I am agreeing with a second company!",
                    subjectOption: false,
                    validUntil: new Date('2029-02-28')
                }),
                JSON.stringify({
                    description: "Consent, The III",
                    subjectOption: false,
                    validUntil: new Date('2029-02-28')
                }),
                JSON.stringify({
                    description: "I am not a human being",
                    subjectOption: false,
                    validUntil: new Date('2029-02-28')
                }),
                JSON.stringify({
                    description: "I concurr that this is one of the options ever written",
                    subjectOption: false,
                    validUntil: new Date('2029-02-28')
                }),
            ]
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