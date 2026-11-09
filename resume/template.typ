// Resume layout. scripts/resume.ts generates the content from config.yaml and
// applies this with `#show: resume.with(...)`.

#let linkblue = rgb(0, 102, 204)

// Entry heading with a right-aligned date or link
#let entry(body, date) = block(below: 3pt, width: 100%)[
  #grid(columns: (1fr, auto), column-gutter: 1em, body, align(right)[#date])
]

#let resume(name: "", body) = {
  set document(title: name + " - Resume", author: name)

  set page(
    paper: "a4",
    margin: 0.5in,
    numbering: none,
  )

  set text(
    font: ("XCharter", "New Computer Modern"),
    size: 11pt,
    lang: "en",
  )

  // Typst is ragged-right by default, so no \raggedright equivalent is needed.
  set par(justify: false, leading: 0.58em, spacing: 0.58em)

  show link: set text(fill: linkblue)

  // Section headings: bolding, size, white space above and below, rule underneath
  show heading.where(level: 1): it => block(above: 11pt, below: 5pt, width: 100%)[
    #set text(size: 12pt, weight: "bold")
    #it.body
    #v(2pt, weak: true)
    #line(length: 100%, stroke: 0.6pt)
  ]

  // Bullet points: size, indentation, white space between bullets
  set list(marker: (text(size: 0.9em)[•], [–]), indent: 0pt, body-indent: 7pt)

  // name
  align(center, text(size: 20pt, name))
  v(5pt, weak: true)

  body
}
