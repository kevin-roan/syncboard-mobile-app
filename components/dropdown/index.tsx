import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

const CustomDropdown = () => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
  const dropdownWidth = 150;

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height,
          width: width,
        });
      });
    }
  }, [visible]);

  const MenuOption = ({
    onSelect,
    children,
  }: {
    onSelect: () => void;
    children: React.ReactNode;
  }) => {
    return (
      <TouchableOpacity onPress={onSelect} style={styles.menuOption}>
        {children}
      </TouchableOpacity>
    );
  };

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef} style={styles.triggerStyle}>
          <Text style={styles.triggerText}>Actions</Text>
        </View>
      </TouchableWithoutFeedback>

      {visible && (
        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={handleClose}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.menu,
                  {
                    top: position.y,
                    left: position.x + position.width / 2 - dropdownWidth / 2,
                    width: dropdownWidth,
                  },
                ]}>
                <MenuOption
                  onSelect={() => {
                    setVisible(false);
                    // Add view details action here
                  }}>
                  <Text>View Details</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    setVisible(false);
                    // Add delete action here
                  }}>
                  <Text>Delete</Text>
                </MenuOption>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  triggerStyle: {
    height: 40,
    backgroundColor: '#007bff', // primary color
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  triggerText: { fontSize: 16, color: 'white' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    width: 80,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuOption: {
    padding: 5,
  },
});

export default CustomDropdown;
