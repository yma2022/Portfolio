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
        className="hidden bg-transparent sm:mt-24 sm:flex "
      >
        <a href={page} aria-label="Continue to next section">
          <Icons.chevronDown className="size-10" />
        </a>
      </Button>
    </motion.div>
  );
};
