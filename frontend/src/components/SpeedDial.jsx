import {
  IconButton,
  SpeedDial,
} from "@material-tailwind/react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useState } from 'react';
import { CardDefault } from './ChatCard'
import { Collapse } from '@material-tailwind/react';

export function SpeedDialCustomIcon() {
  const [showCard, setShowCard] = useState(false);

  return (
    <div>
      <CardDefault />
      <Collapse open={showCard}>
        teste
      </Collapse>
      <div className="relative w-full h-full" onClick={() => setShowCard(prevShowCard => !prevShowCard)}>
        <div className="absolute bottom-0 right-8">
          <SpeedDial>
            <IconButton size="lg" className="rounded-full">
              <ChatBubbleOvalLeftEllipsisIcon className="block h-5 w-5" />
            </IconButton>
          </SpeedDial>
        </div>
      </div>
    </div>
  );
}