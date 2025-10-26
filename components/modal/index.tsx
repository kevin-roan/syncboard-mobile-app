import * as React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<Props> = ({ visible, onRequestClose, children }) => {
  return (
    <Modal style={styles.container} visible={visible} onRequestClose={onRequestClose}>
      <BlurView
        intensity={3}
        style={{
          flex: 1,
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView">
        <Pressable style={styles.modalOverlay} onPress={onRequestClose}>
          {children}
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
});

export default ModalContainer;
