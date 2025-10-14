import { useState, useRef } from 'react';
import { View, TouchableNativeFeedback, Modal, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import AvatarGroup from '@/components/ui/avatargroup';
import DateChip from '@/components/ui/datechip';
import moment from 'moment';
import { useRouter } from 'expo-router';
import ProgressChip from '@/components/ui/progresschip';

interface Props {
  title: string;
  onPress: () => void;
}

const TaskCard: React.FC<Props> = ({ title, onPress }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

  const triggerRef = useRef(null);

  const toggleModal = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setPosition({ x, y: y + height, width });
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.1)', false)}>
        <View className="gap-3 rounded-xl bg-card p-3">
          <Text>React native reanimated implementation, migration docs</Text>
          <View className="flex-row gap-2">
            <AvatarGroup title={'3 People'} onPress={() => {}} />
            <DateChip date={moment().daysInMonth()} />
            <ProgressChip ref={triggerRef} status="in_progress" onPress={toggleModal} />
          </View>
        </View>
      </TouchableNativeFeedback>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View
            style={[styles.popup, { top: position.y, left: position.x, width: position.width }]}>
            <Text>This is the modal content below the trigger</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  popup: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default TaskCard;
