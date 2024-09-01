import { useAddToDoInput } from './hooks';

export default function AddToDoInput() {
  const {
    handleSubmit,
    inputField,
    disableErrorWhenStartTyping,
    textInputClassName,
    shouldDisplayError
  } = useAddToDoInput();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex my-5">
        <input
          type="text"
          placeholder="What should you do?"
          ref={inputField}
          className={textInputClassName}
          onChange={disableErrorWhenStartTyping}
        />
        <button
          className="text-primary text-2xl p-2 hover:bg-primary/20 rounded"
          type="submit"
        >
          +
        </button>
      </div>
      {shouldDisplayError ? (
        <span className="text-red-500">
          You already added this to-do!
        </span>
      ) : null}
    </form>
  );
}
