type EmbedPageProps = {
  website: string
  title: string
}

const WebsiteEmbed = ({ website, title }: EmbedPageProps) => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <iframe
          src={`${website}`} // Replace with the URL you want to embed
          title={title}
          className="h-full w-full border-none"
          allowFullScreen
        />
      </div>
    </>
  )
}

export default WebsiteEmbed
