import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  header: {
    backgroundColor: '#000',
    height: 90,
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconText: {
    color: '#FFFFFF',
    fontSize: 45,
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  appointmentsScroll: {
    paddingLeft: 20,
    paddingVertical: 10,
    flexGrow: 0,
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 160,
    height: 120,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  appointmentService: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statusPendente: {
    backgroundColor: '#FFD700',
  },
  statusConfirmado: {
    backgroundColor: '#28A745',
  },
  statusCancelado: {
    backgroundColor: '#DC3545',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },

  newAppointmentCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  nextAppointmentTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  datePickerPlaceholder: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  yellowButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  yellowButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
});