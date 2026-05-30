import AppColors from '@/constants/AppColors';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfirmDiscardModal({
  visible,
  onKeepEditing,
  onDiscard,
  message = 'Discard changes? Unsaved edits will be lost.',
  cancelLabel = 'Keep Editing',
  confirmLabel = 'Discard',
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onKeepEditing}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.modalDivider} />
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalKeepBtn}
              onPress={onKeepEditing}
              activeOpacity={0.7}
            >
              <Text style={styles.modalKeepText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <View style={styles.modalActionsDivider} />
            <TouchableOpacity
              style={styles.modalDiscardBtn}
              onPress={onDiscard}
              activeOpacity={0.7}
            >
              <Text style={styles.modalDiscardText}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    width: '78%',
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    overflow: 'hidden',
  },
  modalMessage: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textOnLight,
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    lineHeight: 22,
  },
  modalDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalActions: {
    flexDirection: 'row',
    height: 50,
  },
  modalKeepBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEEE',
  },
  modalKeepText: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textOnLight,
  },
  modalActionsDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalDiscardBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.background,
  },
  modalDiscardText: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.surface,
  },
});