const createMaskedIcon =
  (src, alt) =>
  ({ className = "w-6 h-6", style, ...rest }) =>
    (
      <span
        role="img"
        aria-label={alt}
        className={className}
        style={{
          display: "inline-block",
          backgroundColor: "currentColor",
          WebkitMask: `url(${src}) center / contain no-repeat`,
          mask: `url(${src}) center / contain no-repeat`,
          verticalAlign: "middle",
          ...style,
        }}
        {...rest}
      />
    );

const sources = {
  JavaScript: "https://cdn.simpleicons.org/javascript",
  TypeScript: "https://cdn.simpleicons.org/typescript",
  React: "https://cdn.simpleicons.org/react",
  Next: "https://cdn.simpleicons.org/nextdotjs",
  Node: "https://cdn.simpleicons.org/nodedotjs",
  Tailwind: "https://cdn.simpleicons.org/tailwindcss",
  Docker: "https://cdn.simpleicons.org/docker",
  Vmware: "https://cdn.simpleicons.org/vmware",
  Vue: "https://cdn.simpleicons.org/vuedotjs",
  Nuxt: "https://cdn.simpleicons.org/nuxt",
  Python: "https://cdn.simpleicons.org/python",
  Mongodb: "https://cdn.simpleicons.org/mongodb",
  Redis: "https://cdn.simpleicons.org/redis",
  MySql: "https://cdn.simpleicons.org/mysql",
  Github: "https://cdn.simpleicons.org/github",
  Git: "https://cdn.simpleicons.org/git",
  wordpress: "https://cdn.simpleicons.org/wordpress",
  Express: "https://cdn.simpleicons.org/express",
  Php: "https://cdn.simpleicons.org/php",
  RabbitMq: "https://cdn.simpleicons.org/rabbitmq"
};

const TechIcons = Object.fromEntries(
  Object.entries(sources).map(([name, src]) => [
    name,
    createMaskedIcon(src, `${name} logo`),
  ])
);

export default TechIcons;
