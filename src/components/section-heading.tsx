import { ReactNode } from 'react';

type TProps = {
  heading: string;
  content?: string | ReactNode | undefined;
};

export const SectionHeading = ({ heading, content }: TProps) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-medium tracking-tighter">{heading}</h2>
      <div className="bg-brand mx-auto mt-2 h-[3px] w-12 rounded-full" />
      {content && (
        <p className="text-muted-foreground mt-3 text-sm">{content}</p>
      )}
    </div>
  );
};
