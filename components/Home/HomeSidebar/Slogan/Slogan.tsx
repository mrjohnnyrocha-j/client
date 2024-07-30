import React from 'react';
import { motion } from 'framer-motion';

const Slogan = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <h2 style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--accent-color)' }}>
        Your Digital Hub for the Future
      </h2>
    </motion.div>
  );
};

export default Slogan;
