import { motion } from 'framer-motion';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';

type NextPageProps = {
  page: string;
};

export const NextPage = ({ page }: NextPageProps) => {
  return (
    <motion.div>
      <Button
        variant="secondary"
        size="icon"
        asChild
        className="bg-transparent sm:mt-24 "
      >
        <a href={page}>
          <Icons.chevronDown className="size-10" />
        </a>
      </Button>
    </motion.div>
  );
};
