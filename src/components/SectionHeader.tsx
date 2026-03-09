interface SectionHeaderProps {
  command: string;
  title: string;
}

const SectionHeader = ({ command, title }: SectionHeaderProps) => (
  <div className="mb-12">
    <p className="section-command font-mono">
      <span className="text-primary">&gt;</span> {command}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold font-sans">{title}</h2>
  </div>
);

export default SectionHeader;
