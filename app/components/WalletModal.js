// components/WalletModal.js
import React from 'react';
import { useConnectors } from '@starknet-react/core';
import Modal from 'react-modal';

Modal.setAppElement('#__next');  // Ensures accessibility by linking to the Next.js root div

export default function WalletModal({ isOpen, onRequestClose }) {
  const { connectors, connect } = useConnectors();

  const handleConnect = (connector) => {
    connect(connector);
    onRequestClose();  // Close modal after connecting
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Connect Wallet"
      className="wallet-modal"
      overlayClassName="wallet-modal-overlay"
    >
      <h2>Connect Wallet</h2>
      <div>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleConnect(connector)}
            disabled={!connector.available()}
          >
            Connect {connector.id}
          </button>
        ))}
      </div>
      <button onClick={onRequestClose}>Close</button>
      <style jsx>{`
        .wallet-modal {
          background: white;
          padding: 20px;
          max-width: 400px;
          margin: auto;
          border-radius: 8px;
        }
        .wallet-modal-overlay {
          background: rgba(0, 0, 0, 0.5);
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Modal>
  );
}
