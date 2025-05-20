<script lang="ts">
	type InputProps = {
		type: 'text' | 'email' | 'password';
		name: string;
		id: string;
		required?: boolean;
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		label: string;
		rest?: unknown;
	};
	const { type, name, id, label, ...rest }: InputProps = $props();
</script>

<div class="formInput">
	<label for={id}>{label}:</label>
	<input {id} {name} {type} {...rest} />
</div>

<style>
	.formInput {
		display: flex;
		flex-direction: column;
		gap: var(--size-2);

		label {
			font-size: var(--scale-00);
			font-weight: 500;
		}

		input {
			padding: var(--size-2) var(--size-3);
			border-radius: var(--rounded-default);
			border: 1px solid var(--color-border);
			background: var(--color-grey-100);

			&:focus {
				outline: none;
				border-color: var(--color-primary);
				box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
			}
		}
	}
</style>
