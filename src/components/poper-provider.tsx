'use client';

import { useEffect } from 'react';
import { Poper } from 'poper-react-sdk';

/**
 * Initializes Poper on the client with the provided account ID.
 * Set NEXT_PUBLIC_POPER_ACCOUNT_ID in your environment to enable.
 */
export default function PoperProvider() {
  const accountID = process.env.NEXT_PUBLIC_POPER_ACCOUNT_ID;

  useEffect(() => {
    if (!accountID) return;
    // Initialize Poper once on mount; the SDK guards against re-init internally.
    Poper({ accountID });
  }, [accountID]);

  return null;
}
