export const getStatus = (statuses, data) => {
    const status = statuses.find((st) => st.id === data.status_id);
    return status ? status.name : '';
}