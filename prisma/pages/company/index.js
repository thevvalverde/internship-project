import Link from "next/link";

export default function Companies() {
    return <div>
                <Link href={"/company/org1"}>
                    <a>Go to company 1</a>
                </Link>
                <br/>
                <Link href={"/company/org2"}>
                    <a>Go to company 2</a>
                </Link>
    </div>
}
