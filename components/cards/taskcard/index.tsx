import { useState, useRef, use } from 'react';
import {
  View,
  TouchableNativeFeedback,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/components/ui/text';
import AvatarGroup from '@/components/ui/avatargroup';
import DateChip from '@/components/ui/datechip';
import moment from 'moment';
import { useRouter } from 'expo-router';
import ProgressChip from '@/components/ui/progresschip';
import { Position } from '@/types/position';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import AddUserDropdown from '@/components/dropdown/adduserdropdown';

interface Props {
  title: string;
  onPress: () => void;
}

const statusList = ['todo', 'in_progress', 'completed'];

const TaskCard: React.FC<Props> = ({ title, onPress }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('in_progress');
  const [progressPosition, setProgressPosition] = useState<Position>({ x: 0, y: 0, width: 0 });

  const [userDropdownVisible, setUserDropdownVisible] = useState<boolean>(false);
  const [userDropdownPosition, setUserDropDownPosition] = useState<Position>({
    x: 0,
    y: 0,
    width: 0,
  });

  const triggerRef = useRef(null);

  const toggleModal = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setProgressPosition({ x, y: y + height, width });
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  };

  const handleSetStatus = (status) => {
    setStatus(status);
  };

  const handleShowUserDropdown = (position: Position) => {
    setUserDropdownVisible(!userDropdownVisible);
    setUserDropDownPosition(position);
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.1)', false)}>
        <View className="gap-3 rounded-xl bg-card p-3">
          <Text>React native reanimated implementation, migration docs</Text>
          <View className="flex-row gap-2">
            <AvatarGroup title={'3 People'} onPress={handleShowUserDropdown} />
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
            style={[
              styles.popup,
              { top: progressPosition.y, left: progressPosition.x, width: progressPosition.width },
            ]}>
            {statusList.map((item, index) => (
              <TouchableOpacity className="my-1 rounded-md px-1" onPress={handleSetStatus}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={userDropdownVisible}
        onRequestClose={() => setUserDropdownVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setUserDropdownVisible(false)}>
          <View
            style={[
              styles.popup,
              {
                top: userDropdownPosition.y + 10,
                left: userDropdownPosition.x,
                width: 200,
                padding: 0,
                borderRadius: 14,
              },
            ]}>
            <AddUserDropdown />
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
    backgroundColor: '#2B2B2B',
    padding: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#3D3D3D',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default TaskCard;
