interface AboutPullQuoteProps {
  children: string
  id?: string
}

export default function AboutPullQuote({ children, id }: AboutPullQuoteProps) {
  return (
    <figure id={id} className="about-pull-quote">
      <blockquote className="font-heading text-xl font-medium leading-snug text-text-main md:text-2xl lg:text-[1.65rem]">
        <span className="about-pull-quote-mark" aria-hidden="true">
          “
        </span>
        {children}
      </blockquote>
    </figure>
  )
}
