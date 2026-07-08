const ArticleContent = ({ description }) => {
  if (!description) return null;

  const paragraphs = description
    .split('\n')
    .filter((p) => p.trim() !== '');

  return (
    <div className="mt-10">

      <div className="prose prose-invert max-w-none">

        {paragraphs.map((paragraph, index) => {

          // H2
          if (paragraph.startsWith('## ')) {
            return (
              <h2
                key={index}
                className="mt-10 mb-5 font-display text-2xl font-bold text-white"
              >
                {paragraph.replace('## ', '')}
              </h2>
            );
          }

          // H3
          if (paragraph.startsWith('### ')) {
            return (
              <h3
                key={index}
                className="mt-8 mb-4 text-xl font-bold text-purple-300"
              >
                {paragraph.replace('### ', '')}
              </h3>
            );
          }

          // Quote
          if (paragraph.startsWith('>')) {
            return (
              <blockquote
                key={index}
                className="my-8 border-l-4 border-purple-500 bg-white/[0.03] px-6 py-4 italic text-gray-300 rounded-r-xl"
              >
                {paragraph.replace('>', '')}
              </blockquote>
            );
          }

          // Bullet
          if (paragraph.startsWith('- ')) {
            return (
              <li
                key={index}
                className="ml-6 mb-2 text-gray-300"
              >
                {paragraph.replace('- ', '')}
              </li>
            );
          }

          // Normal paragraph
          return (
            <p
              key={index}
              className={`leading-8 text-[17px] text-gray-300 ${
                index === 0
                  ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-purple-400 first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                  : ''
              }`}
            >
              {paragraph}
            </p>
          );
        })}

      </div>

    </div>
  );
};

export default ArticleContent;