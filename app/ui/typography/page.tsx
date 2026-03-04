import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"

export default function TypographyShowcasePage() {
  return (
    <div className="flex flex-col gap-10 w-full [&_div.flex.items-start.justify-between>*:first-child]:-mt-[0.35em]">
      <header className="flex flex-col gap-3">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
          Type
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm">
          Typography styles for headings, body text, and UI elements.
        </p>
      </header>
      <section className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <H1 className="mt-0">Taxing Laughter: The Joke Tax Chronicles</H1>
          <Badge variant="outline" className="shrink-0">
            H1 · text-4xl · semibold
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <Lead>A modal dialog that interrupts the user with important content and expects a response.</Lead>
          <Badge variant="outline" className="shrink-0">
            Lead · text-xl · muted
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <H2 className="mt-0">The King&apos;s Plan</H2>
          <Badge variant="outline" className="shrink-0">
            H2 · text-3xl · semibold
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <P className="mt-0">
            The king thought long and hard, and finally came up with a brilliant
            plan: he would tax the jokes in the kingdom.
          </P>
          <Badge variant="outline" className="shrink-0">
            Body · text-base · leading-7
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <H3 className="mt-0">The Joke Tax</H3>
          <Badge variant="outline" className="shrink-0">
            H3 · text-2xl · semibold
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <P className="mt-0">
            The king&apos;s subjects were not amused. They grumbled and
            complained, but the king was firm.
          </P>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <H4 className="mt-0">People stopped telling jokes</H4>
          <Badge variant="outline" className="shrink-0">
            H4 · text-xl · semibold
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <P className="mt-0">
            As a result, people stopped telling jokes, and the kingdom fell into
            a gloom.
          </P>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <Large>Are you absolutely sure?</Large>
          <Badge variant="outline" className="shrink-0">
            Large · text-lg · semibold
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <Small>Email address</Small>
          <Badge variant="outline" className="shrink-0">
            Small · text-sm · medium
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <Muted>Enter your email address.</Muted>
          <Badge variant="outline" className="shrink-0">
            Muted · text-sm · muted-foreground
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <P className="mt-0">
            Inline code:{" "}
            <InlineCode>@radix-ui/react-alert-dialog</InlineCode> for the
            component.
          </P>
          <Badge variant="outline" className="shrink-0">
            Inline code · text-sm · mono
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <blockquote className="mt-0 border-l-2 pl-6 italic">
            &quot;After all,&quot; he said, &quot;everyone enjoys a good joke,
            so it&apos;s only fair that they should pay for the
            privilege.&quot;
          </blockquote>
          <Badge variant="outline" className="shrink-0">Blockquote</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <H3 className="mt-0">List</H3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners: 20 gold coins</li>
            </ul>
          </div>
          <Badge variant="outline" className="shrink-0">Unordered list</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <H3 className="mt-0">Ordered list</H3>
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ol>
          </div>
          <Badge variant="outline" className="shrink-0">Ordered list</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <H3 className="mt-0">Table</H3>
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <th className="border px-4 py-2 text-left font-bold">
                      King&apos;s Treasury
                    </th>
                    <th className="border px-4 py-2 text-left font-bold">
                      People&apos;s happiness
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2">Empty</td>
                    <td className="border px-4 py-2">Overflowing</td>
                  </tr>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2">Modest</td>
                    <td className="border px-4 py-2">Satisfied</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Badge variant="outline" className="shrink-0">Table</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <P className="mt-0">
            Link styles:{" "}
            <a
              href="#"
              className="text-primary font-medium underline underline-offset-4"
            >
              a brilliant plan
            </a>
          </P>
          <Badge variant="outline" className="shrink-0">Link</Badge>
        </div>
      </section>
    </div>
  )
}
